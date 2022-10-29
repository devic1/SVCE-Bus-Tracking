from django.db import models

# Create your models here.


class Busno(models.Model):
    ad = models.CharField(null=True,max_length=30)
    busno = models.CharField(null=True,max_length=60,default="Bus No : 1 Tiruvotriyur")
    stopname = models.CharField(null=True,max_length=70,default="Lift Gate")


    def __str__(self):
        return f"{self.id} <-- id {self.busno} <--- routeno"
