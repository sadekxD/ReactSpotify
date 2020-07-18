import React, {useEffect, useState, useRef} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from './components/item';
import { spotifyURL } from './constants';
import axios from 'axios';

import { 
  Grid, 
  TextField, 
  makeStyles, 
  InputAdornment, 
  Typography,
  Chip
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const words = [
  "Many",
  "things",
  "come",
  "mind",
  "specifically:",
  "good",
  "poem",
  "makes",
  "feel",
  "like",
  "you’ve",
  "been",
  "there",
  "before,",
  "want",
  "good",
  "poem",
  "takes",
  "city,",
  "sea,",
  "heart",
  "matters;",
  "taste",
  "belong",
  "good",
  "poem",
  "menagerie",
  "craft;",
  "spinning",
  "sound,",
  "word",
  "choice,",
  "alliteration,",
  "rhythm",
  "often",
  "good",
  "poem",
  "arrangement",
  "enchantment,",
  "Patrick",
  "Lewis",
  "says,",
  "blind",
  "date",
  "with"
  ]

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    position: 'relative',
  },
  title: {
    color: 'white',
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  searchField: {
    width: '80%',
    minWidth: 300,
  },
  input: {
    backgroundColor: '#212121',
    color: "grey",
    borderRadius: 'none',
    fontSize: 20,
  },
  item: {
    width: '100%',
  }
}))

function App(props) {
  const [search, setSearch] = useState(words[Math.floor(Math.random() * words.length)]);
  const [data, setData] = useState([]);
  const itemRef = useRef(null);
  
  useEffect(() => {
    handleSearch();
  },[search]);
  
  const handleSearch = () => {
    axios
     .post(spotifyURL, {search})
     .then(res => {
         setData(res.data.tracks.items);
        })
     .catch(err => console.log(err))
  }

  const classes = useStyles();

  return (
    <Grid container spacing={4} style={{margin:0, width:'100%'}}>
      <Grid item className={classes.formContainer} xm={12} sm={12} md={12} xl={12} lg={12} >
        <Chip className={classes.title} variant="outlined" size="small" label={<Typography>Simple Spotify API</Typography>} />
        <TextField 
          id="outlined-basic" 
          className={classes.searchField}
          onChange={(e) => {setSearch(e.target.value)}} 
          variant="outlined" 
          size="small"
          placeholder="E.g. Drake...."
          InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          }}
        />
      </Grid>
      {
        data.map((item, i) => {
          return(
              item.preview_url && (
                <Grid className={classes.item} style={{width:'100%'}} key={i} item md={3} sm={4} xm={12}>
                  <Card data={item} />
                </Grid>
              )
          )
        })
      }
    </Grid>
  );
}


export default App;

