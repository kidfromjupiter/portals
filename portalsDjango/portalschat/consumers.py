import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import SimpleUser,ChatRoom

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": 'chat.leave', "username": self.username}
        )
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        #db cleanup
        #check if user in other rooms. if not, delete user
        #check if room has no users. if so, delete room
        user = await database_sync_to_async(SimpleUser.objects.get)(username=self.username)
        chatroom = await database_sync_to_async(ChatRoom.objects.get)(name=self.room_name)
        await database_sync_to_async(chatroom.users.remove)(user.id)
        if await database_sync_to_async(chatroom.users.count)() == 0:
            await database_sync_to_async(chatroom.delete)()
        if await database_sync_to_async(user.chatrooms.count)() == 0:
            await database_sync_to_async(user.delete)()
     

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {**{"type": 'chat.message'}, **text_data_json}
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps(event))

    async def chat_leave(self,event):
        await self.send(text_data=json.dumps(event))

    async def chat_initial(self, event):

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"type": "chat.initial", "username": event["username"]}))
        self.username = event["username"]
        # database stuff    
        user,_ = await database_sync_to_async(SimpleUser.objects.get_or_create)(username=event["username"])
        chatroom,__ = await database_sync_to_async(ChatRoom.objects.get_or_create)(name=self.room_name)
        await database_sync_to_async(chatroom.users.add)(user.id)