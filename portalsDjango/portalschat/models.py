from django.db import models

# Create your models here.
class SimpleUser(models.Model):
    username = models.CharField(max_length=200)
    
    def __str__(self):
        return self.username

class ChatRoom(models.Model):
    name = models.CharField(max_length=200)
    users = models.ManyToManyField(SimpleUser, related_name='chatrooms')

    def __str__(self):
        return self.name

    def users_online(self):
        return self.users.count()