-- select p.title, p.content, u.username, u.profile_pic, u.year, u.make, u.model, u.location from posts p
-- join users u
-- on u.id = p.user_id
-- where p.id = $1

select row_to_json(p)
from(
    select po.id, user_id, title, content, photo, topic_id, date, profile_pic, username, location, make, model, year,
        (
            select array_to_json(array_agg(row_to_json(re)))
            from (
                select r.id as reply_id, r.reply, r.date, u.id as user_id, u.username, u.location, u.make, u.model, u.year, u.profile_pic
                from replies r
                join users u on user_id = u.id
                where r.post_id = po.id
                order by r.id asc
            )re
        ) replies
    from posts as po
    join users on po.user_id = users.id
    where po.id = $1
)p;
