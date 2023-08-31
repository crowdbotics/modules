from django.db import models
from django.conf import settings
import time


def nameFile(instance, filename):
    """
    nameFile returns the name of the file to be uploaded with the folder location.

    """
    ext = filename.split(".")[-1]
    milliseconds = round(time.time() * 1000)
    filename = "%s.%s" % (milliseconds, ext)
    return "/".join(["static", "signature", filename])


class Signature(models.Model):
    image = models.ImageField(upload_to=nameFile)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.id
