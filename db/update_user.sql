update users
set username = ${username}, location = ${location}, email = ${email}, year = ${year}, make = ${make}, model = ${model}, profile_pic = ${profile_pic}
where id = ${id}

returning id, username, location, email, year, make, model, profile_pic