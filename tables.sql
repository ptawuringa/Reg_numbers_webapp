drop table if exists towns, registration_numbers;

create table towns(
	id serial not null primary key,
	town_name text not null,
    code text not null
);

create table registration_numbers (
	id serial not null primary key,
    reg_number text not null,
	town_id int not null,
	foreign key (town_id) references towns(id)
);


insert into towns (town_name,code) values('Bellville', 'CY');
insert into towns (town_name,code) values('Paarl', 'CJ');
insert into towns (town_name,code) values('Cape Town', 'CA');
--  !(/C[AYJ] \d{3,5}$/.test(reg)) || (/C[AYJ] \d|-\d+$/.test(reg)

--(!(/[a-zA-Z]/.test(reg)))