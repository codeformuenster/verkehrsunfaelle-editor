import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  qnaBox: {},
  qna: {
    marginBottom: theme.spacing(3),
  },
  qnaItem: {
    '&:before': {
      content: '"Frage: "',
      fontVariant: 'all-small-caps',
      textTransform: 'uppercase',
      position: 'absolute',
      fontSize: '16px',
      marginTop: '-16px',
      color: theme.palette.text.secondary,
    },
  },
  question: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    '&:before': {
      content: '"Frage: "',
    },
  },
  answer: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(3),
    '&:before': {
      content: '"Antwort: "',
      marginTop: '-24px',
    },
  },
}));

const questionsAndAnswers = [
  {
    id: 'hintergrund',
    question: 'Was ist das hier für eine Seite?',
    answer: 'Durch eine Anfrage auf Frag den Staat...',
  },
  {
    id: 'wieso-einloggen',
    question: 'Wieso muss ich mich Einloggen?',
    answer: (
      <>
        Musst du nicht! Du kannst deine Korrekturen auch Anonym machen.
        <br />
        Dazu einfach im Login-Fenster auf &quot;Anonym einloggen&quot; klicken.
      </>
    ),
  },
];

const FaqPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          Häufig gestellte Fragen
        </Typography>
        <Box className={classes.qnaBox}>
          {questionsAndAnswers.map(({ id, question, answer }, i) => (
            <div id={id} key={`${id}-${i}`} className={classes.qna}>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                className={clsx(classes.qnaItem, classes.question)}
              >
                {question}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                className={clsx(classes.qnaItem, classes.answer)}
              >
                {answer}
              </Typography>
            </div>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FaqPage;
