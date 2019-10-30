import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
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
    textAlign: 'justify',
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
    answer: (
      <>
        In Münster gibt es im Vergleich zu anderen NRW-Städten viele
        Verkehrsunfälle. Um es der interessierten Stadtöffentlichkeit zu
        ermöglichen, gut informiert an der Diskussion zur Verbesserung der Lage
        teilzunehmen, wollen wir die Daten zu den Verkehrsunfällen möglichst
        leicht zugänglich machen. Leider ist die Datenqualität der
        Verkehrunfallstatistik der Polizei Münster nicht die allerbeste. Nach
        mehreren Versuchen ist es uns gelungen, die zwischen den Jahren
        unterschiedlichen Spaltennamen und Formate in eine Datenbank zu laden,
        um sie{' '}
        <Link
          target="_blank"
          href="https://crashes.codeformuenster.org"
          rel="noopener"
        >
          zu visualisieren und einfach zugänglich
        </Link>
        zu machen (Folien eines Vortrages auf dem &quot;Forum Citizen Science
        2019&quot; mit weiteren Infos und Quellen zum Projekt{' '}
        <Link
          target="_blank"
          // eslint-disable-next-line max-len
          href="https://github.com/codeformuenster/crashes-shiny/blob/master/doc/vortrag_forum_citizen_science_september_2019/PVI_Terstiege_SichererRadfahren_26Sep.pdf"
          rel="noopener"
        >
          finden sich hier
        </Link>
        ). Bedauerlicherweise werden die Orte der Verkehrsunfälle in einem nur
        schwer maschinenlesbaren Format aufgenommen (z.B.: &apos;Kappenberger
        Damm, Höhe Kriegerweg&apos;). Wir haben es uns nun zur Aufgabe gemacht
        alle Unfälle durchzugehen und den korrekten Ort einzupflegen. Da es so
        viele Unfälle sind, setzen wir mit diesem Unfalleditor auf Deine Hilfe.
        Danke!
      </>
    ),
  },
  {
    id: 'wer-seid-ihr',
    question: 'Wer steckt hinter dieser Seite?',
    answer: (
      <>
        &quot;Code for Münster&quot; ist ein lockerer Zusammenschluss von
        Menschen, die in ihrer Freizeit ehrenamtlich auf mehr Transparenz in der
        Gesellschaft und Verwaltung hinwirken wollen. Dazu versuchen sie
        Datenschätze der öffentlichen Hand (Stadt, Stadtwerke, etc.) für die
        Allgemeinheit zu öffnen. Von diesen offenen Daten und Anwendungen, die
        auf diesen offenen Daten aufbauen (z.B. dieser Unfalldateneditor)
        profitiert dann die Stadtgesellschaft.
        <br />
        Klingt interessant? Komm gerne vorbei, wir sind immer offen für neue
        Leute! Weitere Informationen unter{' '}
        <Link
          target="_blank"
          rel="noopener"
          href="https://codeformuenster.org/"
        >
          codeformuenster.org
        </Link>
        .
      </>
    ),
  },
  {
    id: 'wieso-einloggen',
    question: 'Wieso muss ich mich einloggen?',
    answer: (
      <>
        Musst du nicht! Du kannst deine Korrekturen auch anonym machen. Dazu
        einfach im Login-Fenster auf &quot;Anonym einloggen&quot; klicken.
        <br />
        <br />
        Wenn Du Dich aber einloggst, dann erscheinst Du auch (wenn Du möchtest)
        in der Highscore-Liste. Schaffst Du es, am meisten Unfälle zu
        korrigieren? Die ersten drei der Rangliste am 1.1.2020 bekommen jeweils
        ein Bier o.ä. von uns ausgegeben!
        <br />
        <br />
        Der Grund für das Einloggen ist, dass wir Missbrauch vermeiden wollen.
        Wir überprüfen stichprobenweise, ob die Korrekturen richtig sind. Falls
        jemand falsche Korrekturen eingibt, können wir einfach alle Korrekturen
        von diesem/r NutzerIn ablehnen.
      </>
    ),
  },
  {
    id: 'datenquelle',
    question: 'Was sind das für Daten und woher kommen sie?',
    answer: (
      <>
        Dank einer Anfrage bei der Polizei Münster über{' '}
        <Link
          target="_blank"
          rel="noopener"
          // eslint-disable-next-line max-len
          href="https://fragdenstaat.de/anfrage/rohdaten-der-verkehrsunfallstatistik-munster/"
        >
          &quot;Frag den Staat&quot;
        </Link>{' '}
        sind wir an Rohdaten der Verkehrsunfälle der Jahre 2007 bis 2014
        gekommen. Die Daten ab 2015 haben wir dankenswerterweise über{' '}
        <Link
          target="_blank"
          rel="noopener"
          // eslint-disable-next-line max-len
          href="https://www.adfc-nrw.de/kreisverbaende/kv-muenster/willkommen-beim-adfcnbspim-muensterland.html"
        >
          den ADFC
        </Link>{' '}
        bekommen. Die Rohdaten lassen sich
        <Link
          target="_blank"
          rel="noopener"
          // eslint-disable-next-line max-len
          href="https://github.com/codeformuenster/open-data/tree/master/Unfallstatistiken"
        >
          hier herunterladen (dort Ordner Rohdaten auswählen)
        </Link>
      </>
    ),
  },
  {
    id: 'ergebnis',
    question: 'Und was habe ich davon?',
    answer: (
      <>
        Kurz gesagt: Mittelfristig bekommst Du eine sicherere
        Verkehrsinfrastruktur, weil es mit den Unfalldaten möglich ist,
        besonders gefährliche Orte zu identifizieren und dann hoffentlich zu
        entschärfen. Und Du kannst ein Bier, Kaffee oder Softdrink gewinnen!
        <br />
        <br />
        Lange Antwort: In Münster gibt es im Vergleich zu anderen NRW-Städten
        viele Verkehrsunfälle. Trotz der seit 2007 bestehenden
        Ordnungspartnerschaft{' '}
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.sicher-durch-muenster.de/"
        >
          &quot;Sicher durch Münster&quot;
        </Link>
        , die für eine Reduktion von Verkehrsunfällen sorgen sollte, verringert
        sich die hohe Unfallanzahl seit über 10 Jahren nicht, teilweise stieg
        sie sogar an.
        <br />
        <br />
        Was steckt hinter dieser Entwicklung? Bei welchen Unfallarten kann man
        von einer Verbesserung der Lage sprechen, bei welchen muss man von einer
        Verschlechterung sprechen? Wo könnten welche Maßnahmen für eine
        Unfallreduktion sorgen? Welche Maßnahmen sind teuer aber wirkungslos?
        <br />
        <br />
        Solche Fragen werden seit Jahren von der interessierten
        Stadtöffentlichkeit, insbesondere durch BefürworterInnen des Radverkehrs
        gestellt (z.B. ADFC). Sie lassen sich auch teilweise durch die von der
        Polizei Münster gesammelten Unfalldaten beantworten. Dazu musste man
        sich bisher jedoch entweder auf die polizeiliche Interpretation
        verlassen oder sich durch große Excel-Tabellen an Rohdaten wühlen.
        <br />
        <br />
        Um es der interessierten Stadtöffentlichkeit zu ermöglichen,
        faktenbasiert an der Diskussion teilzunehmen, haben wir von &quot;Code
        For Münster&quot; eine{' '}
        <Link
          target="_blank"
          rel="noopener"
          href="https://crashes.codeformuenster.org"
        >
          interaktive räumliche Unfalldatenvisualisierung
        </Link>{' '}
        erstellt (Folien eines Vortrages auf dem &quot;Forum Citizen Science
        2019&quot; mit weiteren Infos und Quellen zum Projekt{' '}
        <Link
          target="_blank"
          // eslint-disable-next-line max-len
          href="https://github.com/codeformuenster/crashes-shiny/blob/master/doc/vortrag_forum_citizen_science_september_2019/PVI_Terstiege_SichererRadfahren_26Sep.pdf"
          rel="noopener"
        >
          finden sich hier
        </Link>
        ). Für diese Visualisierung brauchen wir aber eine bessere
        Datenqualität, insbesondere bei den Unfallorten. Deshalb haben wir
        diesen Unfalleditor entwickelt.
        <br />
        <br />
        Letztlich können durch unsere Projekte zivilgesellschaftliche
        Organisationen sowohl Fragen nach Unfallschwerpunkten neu bewerten als
        auch Trends in den Daten offenlegen, die von der Ordnungspartnerschaft
        &quot;Sicher durch Münster&quot; so bisher nicht entdeckt oder
        kommuniziert wurden.
      </>
    ),
  },
  {
    id: 'noch-eine-frage',
    question: 'Ich habe noch eine Frage!',
    answer: (
      <>
        Super! Schick Deine Frage doch gerne per e-Mail an{' '}
        <Link href="mailto:muenster@codefor.de">muenster@codefor.de</Link> oder
        komm uns einfach mal besuchen (siehe{' '}
        <Link
          target="_blank"
          rel="noopener"
          href="https://codeformuenster.org/"
        >
          codeformuenster.org
        </Link>
        ).
      </>
    ),
  },
];

const FaqPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
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
