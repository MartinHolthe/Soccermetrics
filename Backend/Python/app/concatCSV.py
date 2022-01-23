from app import app

import pandas as pd
from glob import glob

data_files = sorted(glob('app/static/Player*.csv'))

mergedata = pd.concat([pd.read_csv(datafile).assign(sourcefilename = datafile) 
            for datafile in data_files], ignore_index=True)

# as the ignore_index=True creates a new index for the merged file, this method removes the oldn index column 
#mergedata.drop("Unnamed: 0", axis=1, inplace=True)
mergedata.drop(columns=['Unnamed: 0', 'sourcefilename'], inplace=True)

mergedata.to_csv('app/static/Stats_T5.csv')

@app.route('/concat')
def concatCSV():
    return 'Concatination completed'
    