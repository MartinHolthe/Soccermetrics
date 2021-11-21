from app import app

import base64
import unicodedata
from io import BytesIO
from IPython import get_ipython
import numpy as np
import pandas as pd
import mpld3
import os
import math
import decimal
import matplotlib
import matplotlib.image as image
from matplotlib.figure import Figure
from matplotlib import artist
from matplotlib import pyplot as plt 
from matplotlib.widgets import Button, RadioButtons, CheckButtons
from matplotlib import rcParams
import ipywidgets
from ipywidgets import interact, IntSlider, interactive, widgets, interact_manual,HBox,fixed
from IPython.display import HTML
import warnings
warnings.filterwarnings('ignore')
layout = widgets.Layout(width='400px', height='30px')
pd.options.display.float_format = "{:.2f}".format
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()
rcParams['font.family'] = 'sans-serif'
rcParams['font.sans-serif'] = ['Franklin Gothic Medium', 'Franklin Gothic Book']
#get_ipython().run_line_magic('matplotlib', 'inline')

Rotelle = pd.read_csv(r'C:\Users\Marti\OneDrive\Dokumenter\VS Projects\Soccermetrics\Backend\Python\app\static\Player_Stats_LL.csv', index_col=0) #husk å sette denne til 1 om det ikke funker || Create buttons for deafult league vs top 5

Rotelle = Rotelle.fillna(0)

# To display all columns and rows
pd.set_option('display.max_columns', None)  
pd.set_option('display.max_rows', None) 

Rotelle['90s'] = Rotelle['minutes']/90

minutes_position_filtered = (Rotelle['minutes'] >= 90)  & (Rotelle['position'].str.startswith('FW')) # Create a slider for minutes played and checkbox for position?
df = Rotelle.loc[minutes_position_filtered, ['player', 'squad', 'minutes', 'position', 'passes_pct', 'progressive_passes', 'passes_into_final_third', 'passes_into_penalty_area', 'assisted_shots','passes_pressure', 'miscontrols', 'dispossessed', 'dribbles_completed_pct', 'dribbles_completed', 'carry_progressive_distance', 'carries', 'carries_into_final_third','touches_att_3rd', 'touches_att_pen_area', 'pass_targets', 'passes_received_pct', 'passes_received', 'gca_per90', 'sca_per90', 'xg_per90', 'npxg_per90','xa_per90', 'npxg_xa_per90', 'xa_net', 'npxg_net','npxg_per_shot', 'shots_on_target_pct', 'aerials_won_pct','aerials_won', 'tackles_won', 'tackles', 'interceptions', 'ball_recoveries', 'pressure_regain_pct', 'dribbled_past', '90s']] #Do not touch this line!!
minutes_filteret = df.set_index('player')

minutes_filteret.head(5)

passing_percentiles = pd.DataFrame()
passing_percentiles['squad'] = minutes_filteret['squad']

#Passing stats
passing_percentiles['Pass\nCompletion %'] = minutes_filteret['passes_pct'].rank(pct=True)*100
passing_percentiles['Pressured Passes\nPer 90'] = minutes_filteret['passes_pressure'].rank(pct=True)*100
passing_percentiles['Progressive Passes\nPer 90'] =     (minutes_filteret['progressive_passes']/minutes_filteret['90s']).rank(pct=True)*100
passing_percentiles['Successful Deliveries\nInto Box Per 90'] =     (minutes_filteret['passes_into_penalty_area']/minutes_filteret['90s']).rank(pct=True)*100
passing_percentiles['Key Passes\n Per 90'] =     (minutes_filteret['assisted_shots']/minutes_filteret['90s']).rank(pct=True)*100


#Possesion stats
passing_percentiles['Rate Adj Target of an\nAttempted Pass'] =    (minutes_filteret['passes_received']*minutes_filteret['passes_received_pct']).rank(pct=True)*100     
passing_percentiles['Turnovers\nPer 90'] =     ((minutes_filteret['miscontrols']+minutes_filteret['dispossessed'])/minutes_filteret['90s']).rank(pct=True, ascending=False)*100
passing_percentiles['Rate Adj Successful\nDribbles Per 90'] =    (minutes_filteret['dribbles_completed']*minutes_filteret['dribbles_completed_pct']/     minutes_filteret['90s']).rank(pct=True)*100                                          
passing_percentiles['Progressive Distance\nPer Carry'] =     (minutes_filteret['carry_progressive_distance']/minutes_filteret['carries']).rank(pct=True)*100
passing_percentiles['Final Third\nEntries'] = minutes_filteret['carries_into_final_third'].rank(pct=True)*100
passing_percentiles['Touches in\nBox'] = minutes_filteret['touches_att_pen_area'].rank(pct=True)*100


#Contribution stats
passing_percentiles['GCA\nPer 90'] = minutes_filteret['gca_per90'].rank(pct=True)*100
passing_percentiles['SCA\nPer 90'] = minutes_filteret['sca_per90'].rank(pct=True)*100
passing_percentiles['xA\nPer 90'] = minutes_filteret['xa_per90'].rank(pct=True)*100
passing_percentiles['Non-Penalty\nxG Per 90'] = minutes_filteret['npxg_per90'].rank(pct=True)*100
passing_percentiles['Non-Penalty\nxA + xG Per 90'] = minutes_filteret['npxg_xa_per90'].rank(pct=True)*100 
passing_percentiles['xG\nPer Shot'] = minutes_filteret['npxg_per_shot'].rank(pct=True)*100
passing_percentiles['Netto xA'] = minutes_filteret['xa_net'].rank(pct=True)*100 


#Defening stats
passing_percentiles['Rate Adj\nAerials Won %'] =     (minutes_filteret['aerials_won']*minutes_filteret['aerials_won_pct']).rank(pct=True)*100     
passing_percentiles['Ball recoveries\nPer 90'] =     (minutes_filteret['ball_recoveries']/minutes_filteret['90s']).rank(pct=True)*100    
passing_percentiles['Interceptions\nPer 90'] =     (minutes_filteret['interceptions']/minutes_filteret['90s']).rank(pct=True)*100 
passing_percentiles['Pressure\nRegain %'] = minutes_filteret['pressure_regain_pct'].rank(pct=True)*100
passing_percentiles['Rate Adj Tackles\n Won %'] =     ((minutes_filteret['tackles_won'])*(minutes_filteret['tackles_won']/minutes_filteret['tackles'])).rank(pct=True)*100
passing_percentiles['Dribbled Past'] = minutes_filteret['dribbled_past'].rank(pct=True, ascending=False)*100                                        
passing_percentiles['minutes'] = minutes_filteret['minutes']
passing_percentiles['position'] = minutes_filteret['position']
passing_percentiles['90s'] = minutes_filteret['90s']

passing_percentiles['minutes'] = passing_percentiles['minutes'].astype(int)
passing_percentiles['minutes'] = passing_percentiles['minutes'].astype(str)
passing_percentiles = passing_percentiles.fillna(0)
passing_percentiles.head(500)

def label_adjuster(i):
    
    if i <= 50: #Everything under this percentile will be pushed to a 100 - outside the chart
        return 100
    else:
        return -10

def percentile_chart(player_name): # Create search function for possible player names
    # Creates bars based on the player entered
    theta = list(map((lambda x: x*math.pi/24), list(range(1,49,2))))
    radii = list(passing_percentiles.loc[player_name][1:25]) # Here i must make a button that can choose between standart_percentiles, defending_percentile, midfild_percentile and attacking_percentile
    width = [math.pi/12]*len(radii)
    
    # Aesthetic details of the figure including color, axis tick size, x value specifics
    # and r-axis limits, etc.
    fig = plt.figure(figsize=(10,10), facecolor = '#ffffff')
    ax = plt.subplot(111, projection='polar')
    ax.set_facecolor('#ffffff')
    #ax = plt.subplot(111, projection='polar')
    ax.grid(True)
    ax.xaxis.grid(linewidth=2.5, color='#343a40')
    ax.yaxis.grid(linewidth=1.5, color='#6c757d', alpha=0.6)
    ax.tick_params(axis='x', colors='xkcd:black')
    ax.tick_params(axis='y', colors='xkcd:black')
    ax.set_rlim(0,100)
    ax.spines['polar'].set_color('xkcd:white')
    ax.spines['polar'].set_linewidth(3)
    ax.set_rlabel_position(0)
    ax.set_rticks([25,50,75])
    ax.tick_params(labelsize=0)
    labels = plt.thetagrids(range(0, 360, 15), ('','','','','','','','','','','','','','','','','','','','','','','',''))
    ax.spines['polar'].set_color('xkcd:black')
    ax.spines['polar'].set_linewidth(2.5)
    ax.set_rorigin(-15)
   
    # Aesthetic details of the bars and chart titles based on player name
    ax.bar(theta, radii, width, color=['#ffba08','#ffba08','#ffba08','#ffba08','#ffba08','#219ebc','#219ebc','#219ebc','#219ebc','#219ebc','#219ebc','#ef233c','#ef233c','#ef233c','#ef233c','#ef233c','#ef233c','#ef233c','#2a9d8f','#2a9d8f', '#2a9d8f', '#2a9d8f', '#2a9d8f','#2a9d8f'],            alpha=0.7, edgecolor='#000000', linewidth=0.5)
    ax.set_title('\n'+player_name+' - Performance Overview\n\n\n',                  color='#212f45', fontsize=26)
    plt.text(0.5, 1.13, "Position: " + r"$\bf{" + passing_percentiles.at[player_name, 'position'] + "}$" + " || " + " Minutes Played: " + r"$\bf{" + passing_percentiles.at[player_name, 'minutes'] + "}$",          horizontalalignment='center', verticalalignment='top', color='#ef233c', size='17',              transform=ax.transAxes)

    l = list(passing_percentiles)
    
    #Adds text to the chart in necessary places
    plt.text(-0.15, -0.1, 'Data obtained from FBRef.com',          horizontalalignment='left', verticalalignment='top', color='xkcd:black',              transform=ax.transAxes, size='14')
    plt.text(0.5, 1.22, "Percentile Rankings vs DF in same League, 2020/21",          horizontalalignment='center', verticalalignment='top', color='#212f45', size='14',              transform=ax.transAxes)
    plt.text(1.2, -0.075, '\nExcludes players with <600 minutes',         horizontalalignment='right', verticalalignment='top', color='xkcd:black',              style='italic', transform=ax.transAxes, size='14')
  
    #fixing bars lables
    plt.text(1.11, 0.59, l[1],horizontalalignment='center', verticalalignment='top', color='xkcd:black',              transform=ax.transAxes, size='13',)
    plt.text(1.07, 0.7, l[2],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13',)
    plt.text(1.02, 0.81, l[3],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.92, 0.93, l[4],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.76, 1, l[5],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.59, 1.055, l[6],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.4, 1.055, l[7],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.23, 1.01, l[8],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.09, 0.93, l[9],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0, 0.83, l[10],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(-0.05, 0.7, l[11],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(-0.09, 0.57, l[12],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(-0.08, 0.42, l[13],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(-0.03, 0.29, l[14],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13') 
    plt.text(0.03, 0.16, l[15],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13') 
    plt.text(0.13, 0.063, l[16],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13') 
    plt.text(0.27, -0.02, l[17],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.42, -0.04, l[18],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text( 0.58, -0.04, l[19],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.75, -0.02, l[20],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(0.89, 0.063, l[21],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')
    plt.text(1, 0.17, l[22],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13') 
    plt.text(1.08, 0.3, l[23],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13') 
    plt.text(1.11, 0.42, l[24],          horizontalalignment='center', verticalalignment='center', color='xkcd:black',             transform=ax.transAxes, size='13')            

    # Annotating bar labels with their values
    for i in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]:
        plt.annotate(str(int(round(radii[i])))+"%", (theta[i], radii[i]+label_adjuster(radii[i])), color='xkcd:black',                 horizontalalignment='center', fontsize=14)
    
    # Buttons
    ax_button = plt.axes([0.05,0.1,0.08,0.05]) #position of button
    #Properties of button
    grid_button = Button(ax_button, 'Grid', color='white', hovercolor='grey')

    def grid(val):
        ax.grid()
        fig.canvas.draw()
    grid_button.on_clicked(grid)

    plt.tight_layout()
    plt.subplots_adjust(left=0.12, right=0.85, top=0.85, bottom=0.08)

    plt.show()
    
@app.route('/rotelleview')
def rotelleview():
    return percentile_chart('Vinicius Júnior')
    

