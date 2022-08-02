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
sectors[Sector: id]
}

Sector{
name;
image;
hoursSun;
localization{
lat;
lng;
}
routes[Route: id]
}

Rout{
name;
image;
lenght;
grade;
voteGrade([{id usuario, vote}porque son las votaciones de todos los usuarios)]
isProyect
isEnchain
users[User: id]
}

User{
name;
image;
email;
province;
routes[Routes: id];
}
