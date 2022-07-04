# Marina_Navarrete_Back-Final-Project-202205-MAD

## Entities

School{
name;
image
period;
localization{
lat;
lng;
}
sections[Sections.populate: id,name]
}

Section{
name;
image;
hoursSun;
localization{
lat;
lng;
}
routes[Routers.populate: id, name, lenght, grade]
}

Routes{
name;
image;
lenght;
grade;
voteGrade([{id usuario, vote}porque son las votaciones de todos los usuarios)]
isProyect
isEnchain
users[Users: id]
}

Users{
name;
image;
email;
province;
routes[Routes: id];
}

## Milestones

0 Common components:
0.1 Footer
0.2 Navbar

1.Landing page
1.1 Sign in button
1.3 Login button
1.2 Login component (form and login button component)
1.3 Init without login button

2.Sign in page
2.1 Sign in form

3.Home Page
3.1 Carrusel
3.2 Mapa API
