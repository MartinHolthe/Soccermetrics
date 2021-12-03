# from app import app

import pandas as pd


Rotelle = pd.read_csv(r'C:\Users\Marti\OneDrive\Dokumenter\VS Projects\Soccermetrics\Backend\Python\app\static\Player_Stats_BL.csv') 

# NULL handling
Rotelle = Rotelle.fillna(0) 
Rotelle['90s'] = Rotelle['minutes']/90

# Select desiered stats
Dataframe = Rotelle.loc[:, ['player', 'squad', 'minutes', '90s', 'position', 'passes_pct', 'progressive_passes', 'passes_into_final_third', 'passes_into_penalty_area', 'assisted_shots','passes_pressure', 'miscontrols', 'dispossessed', 'dribbles_completed_pct', 'dribbles_completed', 'carry_progressive_distance', 'carries', 'carries_into_final_third','touches_att_3rd', 'touches_att_pen_area', 'pass_targets', 'passes_received_pct', 'passes_received', 'gca_per90', 'sca_per90', 'xg_per90', 'npxg_per90','xa_per90', 'npxg_xa_per90', 'xa_net', 'npxg_net','npxg_per_shot', 'shots_on_target_pct', 'aerials_won_pct','aerials_won', 'tackles_won', 'tackles', 'interceptions', 'ball_recoveries', 'pressure_regain_pct','clearances', 'blocks', 'dribbled_past']] #Do not touch this line!!

Percentiles = pd.DataFrame()
Percentiles['player'] = Dataframe['player']
Percentiles['squad'] = Dataframe['squad']
Percentiles['position'] = Dataframe['position']
Percentiles['minutes'] = Dataframe['minutes']
Percentiles['90s'] = Dataframe['90s']

#Passing stats
Percentiles['Pass\nCompletion %'] = Dataframe['passes_pct']
Percentiles['Pressured Passes\nPer 90'] = Dataframe['passes_pressure']
Percentiles['Progressive Passes\nPer 90'] = \
    (Dataframe['progressive_passes']/Dataframe['90s'])
Percentiles['Successful Deliveries\nInto Box Per 90'] = \
    (Dataframe['passes_into_penalty_area']/Dataframe['90s'])
Percentiles['Key Passes\n Per 90'] = \
    (Dataframe['assisted_shots']/Dataframe['90s'])

#Possesion stats
Percentiles['Rate Adj Target of an\nAttempted Pass'] =\
    (Dataframe['passes_received']*Dataframe['passes_received_pct'])     
Percentiles['Turnovers\nPer 90'] = \
    ((Dataframe['miscontrols']+Dataframe['dispossessed'])/Dataframe['90s'])
Percentiles['Rate Adj Successful\nDribbles Per 90'] =\
    (Dataframe['dribbles_completed']*Dataframe['dribbles_completed_pct']/ \
    Dataframe['90s'])                                         
Percentiles['Progressive Distance\nPer Carry'] = \
    (Dataframe['carry_progressive_distance']/Dataframe['carries'])
Percentiles['Final Third\nEntries'] = Dataframe['carries_into_final_third']
Percentiles['Touches in\nBox'] = Dataframe['touches_att_pen_area']
Percentiles['Touches in\n1/3'] = Dataframe['touches_att_3rd']

#Contribution stats
Percentiles['GCA\nPer 90'] = Dataframe['gca_per90']
Percentiles['SCA\nPer 90'] = Dataframe['sca_per90']
Percentiles['xA\nPer 90'] = Dataframe['xa_per90']
Percentiles['Non-Penalty\nxG Per 90'] = Dataframe['npxg_per90']
Percentiles['Non-Penalty\nxA + xG Per 90'] = Dataframe['npxg_xa_per90'] 
Percentiles['xG\nPer Shot'] = Dataframe['npxg_per_shot']
Percentiles['Netto xA'] = Dataframe['xa_net']

#Defening stats
Percentiles['Rate Adj\nAerials Won %'] = \
    (Dataframe['aerials_won']*Dataframe['aerials_won_pct'])     
Percentiles['Ball recoveries\nPer 90'] = \
    (Dataframe['ball_recoveries']/Dataframe['90s'])    
Percentiles['Interceptions\nPer 90'] = \
    (Dataframe['interceptions']/Dataframe['90s']) 
Percentiles['Pressure\nRegain %'] = Dataframe['pressure_regain_pct']
Percentiles['Rate Adj Tackles\n Won %'] = \
    ((Dataframe['tackles_won'])*(Dataframe['tackles_won']/Dataframe['tackles']))
Percentiles['Dribbled Past'] = Dataframe['dribbled_past']
Percentiles['Clearances\nPer 90'] = \
    (Dataframe['clearances']/Dataframe['90s'])
Percentiles['Blocks\nPer 90'] = \
    (Dataframe['blocks']/Dataframe['90s'])

Percentiles.to_csv(r'C:\Users\Marti\OneDrive\Dokumenter\VS Projects\Soccermetrics\Backend\Python\app\static\Percentile_Bundesliga.csv')
    
""" @app.route('/cleancsv')
def cleancsv():
    return Percentile_Bundesliga.to_json(orient = 'index') """
    

