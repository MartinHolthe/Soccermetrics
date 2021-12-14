from app import app

#Truncate before inserting ?

import psycopg2
conn = psycopg2.connect("host=localhost dbname=Soccermetrics user=postgres password='2312Ottestad'")
cur = conn.cursor()

with open('app\static\Player_Stats_BL.csv', 'r', encoding='UTF-8') as f:
    # Notice that we don't need the `csv` module.
    next(f) # Skip the header row. insert.py
    cur.copy_from(f, 'bundesliga', sep=',')

conn.commit()

@app.route('/dbinsert')
def playerscrape():
    return 'insertion into db completed'
