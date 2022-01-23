from app import app

import pandas as pd

Rotelle = pd.read_csv(r'app\static\Player_Stats_BL.csv') 

# NULL handling
Rotelle = Rotelle.fillna(0) 
Rotelle['90s'] = Rotelle['minutes']/90

# Select desiered stats
Dataframe = Rotelle.loc[:, ['player', 'squad', 'minutes', '90s', 'position', 'passes_pct', 'progressive_passes', 'passes_into_final_third', 'passes_into_penalty_area', 'assisted_shots','passes_pressure', 'miscontrols', 'dispossessed', 'dribbles_completed_pct', 'dribbles_completed', 'carry_progressive_distance', 'carries', 'carries_into_final_third','touches_att_3rd', 'touches_att_pen_area', 'pass_targets', 'passes_received_pct', 'passes_received', 'gca_per90', 'sca_per90', 'xg_per90', 'npxg_per90','xa_per90', 'npxg_xa_per90', 'xa_net', 'npxg_net','npxg_per_shot', 'shots_on_target_pct', 'aerials_won_pct','aerials_won', 'tackles_won', 'tackles', 'interceptions', 'ball_recoveries', 'pressure_regain_pct','clearances', 'blocks', 'dribbled_past']] #Do not touch this line!!

# Is it better to do the percentiles with numpy before insertion or by SQL on button click? should i remove .rank(pct=True)*100?
Percentiles = pd.DataFrame()
Percentiles['player'] = Dataframe['player']
Percentiles['squad'] = Dataframe['squad']
Percentiles['position'] = Dataframe['position']
Percentiles['minutes'] = Dataframe['minutes']
Percentiles['90s'] = Dataframe['90s']

#Passing stats
Percentiles['Pass Completion %'] = Dataframe['passes_pct'].rank(pct=True)*100
Percentiles['Pressured Passes Per 90'] = Dataframe['passes_pressure'].rank(pct=True)*100
Percentiles['Progressive Passes Per 90'] = (Dataframe['progressive_passes']/Dataframe['90s']).rank(pct=True)*100
Percentiles['Successful Deliveries Into Box Per 90'] = (Dataframe['passes_into_penalty_area']/Dataframe['90s']).rank(pct=True)*100
Percentiles['Key Passes Per 90'] = (Dataframe['assisted_shots']/Dataframe['90s']).rank(pct=True)*100

#Possesion stats
Percentiles['Rate Adj Target of an Attempted Pass'] =(Dataframe['passes_received']*Dataframe['passes_received_pct']).rank(pct=True)*100     
Percentiles['Turnovers Per 90'] = ((Dataframe['miscontrols']+Dataframe['dispossessed'])/Dataframe['90s']).rank(pct=True, ascending=False)*100
Percentiles['Rate Adj Successful Dribbles Per 90'] =(Dataframe['dribbles_completed']*Dataframe['dribbles_completed_pct']/Dataframe['90s']).rank(pct=True)*100                                         
Percentiles['Progressive Distance Per Carry'] = (Dataframe['carry_progressive_distance']/Dataframe['carries']).rank(pct=True)*100
Percentiles['Final Third Entries'] = Dataframe['carries_into_final_third'].rank(pct=True)*100
Percentiles['Touches in Box'] = Dataframe['touches_att_pen_area'].rank(pct=True)*100
Percentiles['Touches in 1/3'] = Dataframe['touches_att_3rd'].rank(pct=True)*100

#Contribution stats
Percentiles['GCA Per 90'] = Dataframe['gca_per90'].rank(pct=True)*100
Percentiles['SCA Per 90'] = Dataframe['sca_per90'].rank(pct=True)*100
Percentiles['xA Per 90'] = Dataframe['xa_per90'].rank(pct=True)*100
Percentiles['Non-Penalty xG Per 90'] = Dataframe['npxg_per90'].rank(pct=True)*100
Percentiles['Non-Penalty xA + xG Per 90'] = Dataframe['npxg_xa_per90'].rank(pct=True)*100 
Percentiles['xG Per Shot'] = Dataframe['npxg_per_shot'].rank(pct=True)*100
Percentiles['Netto xA'] = Dataframe['xa_net'].rank(pct=True)*100

#Defening stats
Percentiles['Rate Adj Aerials Won %'] = (Dataframe['aerials_won']*Dataframe['aerials_won_pct']).rank(pct=True)*100     
Percentiles['Ball recoveries Per 90'] = (Dataframe['ball_recoveries']/Dataframe['90s']).rank(pct=True)*100    
Percentiles['Interceptions Per 90'] = (Dataframe['interceptions']/Dataframe['90s']).rank(pct=True)*100 
Percentiles['Pressure Regain %'] = Dataframe['pressure_regain_pct'].rank(pct=True)*100
Percentiles['Rate Adj Tackles Won %'] = ((Dataframe['tackles_won'])*(Dataframe['tackles_won']/Dataframe['tackles'])).rank(pct=True)*100
Percentiles['Dribbled Past'] = Dataframe['dribbled_past'].rank(pct=True, ascending=False)*100
Percentiles['Clearances Per 90'] = (Dataframe['clearances']/Dataframe['90s']).rank(pct=True)*100
Percentiles['Blocks Per 90'] = (Dataframe['blocks']/Dataframe['90s']).rank(pct=True)*100

Percentiles = Percentiles.fillna(0) 
Percentiles.to_csv(r'app\static\Percentile_Bundesliga.csv')
    
@app.route('/cleancsv')
def cleancsv():
    return 'csv cleaned to rotelle stats'
    

