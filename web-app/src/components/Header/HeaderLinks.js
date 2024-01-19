/*eslint-disable*/
import React, {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import { Info, AccountBox, House } from "@mui/icons-material";
import Button from "components/CustomButtons/Button.js";
import styles from '../../styles/headerLinksStyle.js';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Select, MenuItem  } from '@mui/material';
import moment from 'moment/min/moment-with-locales';
import EmailIcon from '@mui/icons-material/Email';
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  const settings = useSelector(state => state.settingsdata.settings);
  const languagedata = useSelector(state => state.languagedata);
  const { i18n,t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [langSelection, setLangSelection] = useState();
  const [multiLanguage,setMultiLanguage] = useState();

  const handleLanguageSelect = (event) => {
    i18n.addResourceBundle(multiLanguage[event.target.value].langLocale, 'translations', multiLanguage[event.target.value].keyValuePairs);
    i18n.changeLanguage(multiLanguage[event.target.value].langLocale);
    setLangSelection(event.target.value);
    moment.locale(multiLanguage[event.target.value].dateLocale);
  };

  useEffect(()=>{
    if(languagedata.langlist){
      for (const key of Object.keys(languagedata.langlist)) {
        if(languagedata.langlist[key].langLocale === i18n.language){
          setLangSelection(key);
        }
      }
      setMultiLanguage(languagedata.langlist);
    }
    
  },[languagedata.langlist]);

  

  useEffect(()=>{
    if(auth.profile && auth.profile.uid){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  },[auth.profile]);
  
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={(e) => { e.preventDefault(); navigate('/') }}
        >
          <House className={classes.icons} />{t('home')}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={(e) => { e.preventDefault(); 
            if(loggedIn){
              navigate('/bookings') 
            } else{
              navigate('/login') 
            }
          }}
        >
          {loggedIn?
            <AccountBox className={classes.icons} /> 
            : 
            <AccountBox className={classes.icons} />  
          }         
         
          {loggedIn?
            t('myaccount')
            : 
           t('login_signup')
          }
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={(e) => { e.preventDefault(); navigate('/about-us') }}
        >
          <Info className={classes.icons} />{t('about_us')}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={(e) => { e.preventDefault(); navigate('/contact-us') }}
        >
        <EmailIcon className={classes.icons} />{t('contact_us')}
        </Button>
      </ListItem>
      {settings && settings.FacebookHandle?
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title={t('follow_facebook')}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={settings.FacebookHandle}
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      :null}
      {settings && settings.TwitterHandle?
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title={t('follow_twitter')}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href={settings.TwitterHandle}
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      :null}
      {settings && settings.InstagramHandle?
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title={t('follow_instagram')}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href={settings.InstagramHandle}
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
      :null}
       {multiLanguage && multiLanguage.length >1 ?
      <ListItem className={classes.listItem} >
        <div style={{display:"flex",justifyContent:"center"}}> 
        <Select
          id="booking-type-native1"
          className={classes.input}
          value={langSelection}
          onChange={handleLanguageSelect}
          style={{backgroundColor:'#fff',paddingLeft:'5px',borderRadius:'5px',height:'35px',marginTop:'5px'}}
        >
          {
            Object.keys(multiLanguage).map((key)=> <MenuItem key={key} value={key} >
            {multiLanguage[key].langName}
            </MenuItem>)
          }
        </Select>
        </div>
      </ListItem>:null}
    </List>
  );
}
