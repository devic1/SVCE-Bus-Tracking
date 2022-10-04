from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect,HttpResponse
from django.urls import reverse
from django.core.exceptions import ValidationError
from django.contrib import messages
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from .tokens import account_activation_token

# Create your views here.
def activate(request,uidb64,token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None
    if user is not None and account_activation_token.check_token(user,token):
        user.is_active = True
        user.save()

        messages.success(request,"Thankyou confirmed")
        return HttpResponseRedirect(reverse('login'))
    else:
        messages.error(request,"try again later")
    return HttpResponseRedirect(reverse('signup'))

def activateemail(request,user,to_email):
    mail_subject = "Activate your account "
    message = render_to_string("mail.html",{
            'user' : user.username,
            'domain' : get_current_site(request).domain,
            'uid' : urlsafe_base64_encode(force_bytes(user.pk)),
            'token':account_activation_token.make_token(user),
            "protocol": 'https' if request.is_secure() else 'http'})
    email = EmailMessage(mail_subject,message,to=[to_email])
    if email.send():
        messages.success(request,"check mail")
    else:
        messages.error(request,"Error try later")


class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=30,required=False)
    email = forms.EmailField(max_length=254)

    class Meta:
        model = User
        fields= ('username','email','password1','password2',)

    def username_clean(self):
        username = self.cleaned_data['username'].lower()
        return username

    """def clean_email(self):
        email = self.cleaned_data['email']
        if not email.endswith('@svce.ac.in'):
            raise ValidationError("Only college mail'id Allowed")
        return email"""



def index(request):
    if request.user.is_authenticated:
        return render(request,"./index.html")
    return HttpResponseRedirect(reverse('login'))


def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
    return render(request,"./login.html")

def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active=False
            user.save()
            activateemail(request,user,form.cleaned_data.get('email'))
            return HttpResponseRedirect(reverse('login'))
    else:
        form = SignUpForm()
    return render(request,"./signup.html",{'form':form})



