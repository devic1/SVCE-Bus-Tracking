# Generated by Django 4.1.1 on 2022-10-28 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='busno',
            name='busno',
            field=models.CharField(default='60', max_length=60, null=True),
        ),
    ]