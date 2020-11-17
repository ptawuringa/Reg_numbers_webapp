create table towns(
	id serial not null primary key,
	town_name text not null,
    registration_id text not null
);

create table registration_numbers (
	id serial not null primary key,
    reg_number text not null,
	town_id int not null,
	foreign key (town_id) references towns(id)
);


insert into towns (town_name,registration_id) values('Bellville', 'CY');
insert into towns (town_name,registration_id) values('Paarl', 'CJ');
insert into towns (town_name,registration_id) values('Cape Town', 'CA');
