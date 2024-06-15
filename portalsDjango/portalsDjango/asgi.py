"""
ASGI config for portalsDjango project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import URLRouter  

from channels.security.websocket import AllowedHostsOriginValidator  
from portalschat.routing import websocket_urlpatterns  

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portalsDjango.settings.dev')

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns,))
        ),
        # Just HTTP for now. (We can add other protocols later.)
    }
)
