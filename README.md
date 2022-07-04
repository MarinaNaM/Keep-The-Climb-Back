# Marina_Navarrete_Back-Final-Project-202205-MAD

## Entities

School{
name;
image
period;
localization{
lat;
lng;
}????????
sections[Sections.populate: id,name]
}

Section{
name;
image;
hoursSun;
localization{
lat;
lng;
}?????
routes[Routers.populate: id, name, lenght, grade]
}

Routes{
name;
image;
lenght;
grade;
voteGrade;???
isProyect
isEnchain
users[Users. populate: id]
}

Users{
name;
image;
email;
province;
routes[Routes.populate: id, name, lenght, grade, voteGrade, isProyect, isEnchain]
}
