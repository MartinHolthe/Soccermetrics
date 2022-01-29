from app import app

#Create table if not exist (good docker practice?) else Truncate before inserting ?

import psycopg2

#connect to DB
conn = psycopg2.connect("host=localhost dbname=Soccermetrics user=postgres password='2312Ottestad'")

#cursor - there are two types of cursors client-side and server-side.. A cursors is equvivalent to a query tool
cur = conn.cursor()

cur.execute('truncate table bundesliga')
cur.execute('truncate table bundesliga_percentiles')
cur.execute('truncate table la_liga')
cur.execute('truncate table ligue_1')
cur.execute('truncate table premier_league')
cur.execute('truncate table serie_a')
cur.execute('truncate table top_5_leagues')

with open('app\static\Percentile_Bundesliga.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'bundesliga_percentiles', sep=',')

with open('app\static\Player_Stats_BL.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'bundesliga', sep=',')

with open('app\static\Player_Stats_LL.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'la_liga', sep=',')

with open('app\static\Player_Stats_L1.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'ligue_1', sep=',')

with open('app\static\Player_Stats_PL.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'premier_league', sep=',')

with open('app\static\Player_Stats_SA.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'serie_a', sep=',')

with open('app\static\Stats_T5.csv', 'r', encoding='UTF-8') as f:
    next(f) # Skip the header row. insert.py
    #Spesify name of table you want to execute quary against
    cur.copy_from(f, 'top_5_leagues', sep=',')

#to update the database you have to commit the changes
conn.commit()

#close the connection and the query tool to avoide data leakage
cur.close()
conn.close()

@app.route('/dbinsert')
def insert():
    return 'insertions into db completed'

