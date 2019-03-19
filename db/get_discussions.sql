select * from topics 
join posts p
on p.topic_id = topics.id
where topics.label = $1