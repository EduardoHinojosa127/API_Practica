from django.db import models

# Create your models here.

class oferta_laboral(models.Model):
    FrontEnd = 'FrontEnd'
    BackEnd = 'BackEnd'
    Perfil = (
        (FrontEnd, 'FrontEnd'),
        (BackEnd, 'BackEnd'),
    )
    Junior = 'Junior'
    Semisenior = 'Semisenior'
    Senior = 'Senior'
    Nivel = (
        (Junior, 'Junior'),
        (Semisenior, 'Semisenior'),
        (Senior,'Senior'),
    )

    titulo= models.CharField(max_length=200)
    empresa = models.CharField(max_length=200)
    perfil = models.CharField(max_length=200, choices=Perfil)
    nivel = models.CharField(max_length=200, choices=Nivel)
    pub_date = models.DateTimeField('date_published')
    def __str__(self):
        return self.titulo
