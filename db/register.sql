insert into users (username, password, email )
values (${username}, ${password}, ${email})
returning id, username, email