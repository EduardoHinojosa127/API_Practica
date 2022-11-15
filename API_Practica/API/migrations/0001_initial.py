# Generated by Django 4.1.3 on 2022-11-15 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='oferta_laboral',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('empresa', models.CharField(max_length=200)),
                ('perfil', models.CharField(choices=[('FrontEnd', 'FrontEnd'), ('BackEnd', 'BackEnd')], max_length=200)),
                ('nivel', models.CharField(choices=[('Junior', 'Junior'), ('Semisenior', 'Semisenior'), ('Senior', 'Senior')], max_length=200)),
                ('pub_date', models.DateTimeField(verbose_name='date_published')),
            ],
        ),
    ]