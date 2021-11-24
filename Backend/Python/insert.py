import psycopg2
conn = psycopg2.connect("host=localhost dbname=Soccermetrics user=postgres password='2312Ottestad'")
cur = conn.cursor()

# cur.execute("""CREATE TABLE users(
#     id integer PRIMARY KEY,
#     email text,
#     name text,
#     address text
# )
# """)

with open('users.csv', 'r') as f:
    # Notice that we don't need the `csv` module.
    next(f) # Skip the header row.
    cur.copy_from(f, 'users', sep=',')

conn.commit()