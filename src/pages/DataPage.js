import React from 'react';
import PropTypes from 'prop-types';
import useStats from '../hooks/use-stats';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

const rawLinksBaseUrl =
  // eslint-disable-next-line max-len
  'https://github.com/codeformuenster/verkehrsunfaelle/releases/download/data-2019-11-03/';

const rawLinks = [
  {
    year: 'Alle',
    excelLink: '',
    csvLink: 'verkehrsunfaelle_raw_2007-2018.csv',
  },
  {
    year: '2007',
    excelLink: 'VU2007.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2007.csv',
  },
  {
    year: '2008',
    excelLink: 'VU2008.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2008.csv',
  },
  {
    year: '2009',
    excelLink: 'VU2009.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2009.csv',
  },
  {
    year: '2010',
    excelLink: 'VU2010.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2010.csv',
  },
  {
    year: '2011',
    excelLink: 'VU2011.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2011.csv',
  },
  {
    year: '2012',
    excelLink: 'VU2012.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2012.csv',
  },
  {
    year: '2013',
    excelLink: 'VU2013.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2013.csv',
  },
  {
    year: '2014',
    excelLink: 'VU2014.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2014.csv',
  },
  {
    year: '2015',
    excelLink: 'VU.PP.2015.xlsb',
    csvLink: 'verkehrsunfaelle_raw_2015.csv',
  },
  {
    year: '2016',
    excelLink: 'VU.PP.2016.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2016.csv',
  },
  {
    year: '2017',
    excelLink: 'VU.PP.2017.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2017.csv',
  },
  {
    year: '2018',
    excelLink: 'VU.PP.2018.xlsx',
    csvLink: 'verkehrsunfaelle_raw_2018.csv',
  },
];

const DownloadLink = ({ filename }) =>
  filename ? (
    <MuiLink
      target="_blank"
      rel="noopener noreferrer"
      href={`${rawLinksBaseUrl}${filename}`}
    >
      {filename}
    </MuiLink>
  ) : (
    '-'
  );

DownloadLink.propTypes = {
  filename: PropTypes.string,
};

const DataPage = () => {
  const {
    isLoading,
    numAccidents,
    numGeometries,
    numCorrections,
    numAccounts,
  } = useStats();

  return (
    <Box>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h4" gutterBottom>
            Verkehrsunfälle in Münster - Daten
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Diese Seite beinhaltet Informationen zum Fortschritt der
            Korrektur/Validierung, Downloadlinks zu den Rohdaten, und in Zukunft
            den finalen Datensatz.
          </Typography>

          <Typography variant="h5" component="h5" gutterBottom>
            Aktueller Fortschritt
          </Typography>
          {isLoading ? (
            <>Wird geladen&hellip;</>
          ) : (
            <>
              <Typography variant="body1" align="justify" gutterBottom>
                Unsere Datenbank umfasst zur Zeit {numAccidents} Unfälle der
                Jahre 2007 bis 2018. Maschinell konnte bereits für{' '}
                {numGeometries} Unfälle ein ungefährer Ort gefunden werden. Das
                sind{' '}
                {(numGeometries / numAccidents).toLocaleString('de-de', {
                  maximumFractionDigits: 1,
                  style: 'percent',
                })}
                .
              </Typography>
              <Typography variant="body1" align="justify" gutterBottom>
                Gemeinsam mit {numAccounts} Helfern konnten bereits{' '}
                {numCorrections} der Unfallorte validiert und korrigiert werden.
                Das sind{' '}
                {(numCorrections / numAccidents).toLocaleString('de-de', {
                  maximumFractionDigits: 1,
                  style: 'percent',
                })}
                .
              </Typography>
            </>
          )}
          <Typography variant="h5" component="h5" gutterBottom>
            Rohdaten
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {/* eslint-disable-next-line max-len */}
            Die Kopfzeile für alle Unfall-CSV Dateien befinden sich in Datei{' '}
            <DownloadLink filename="verkehrsunfaelle_raw_headers.csv" />{' '}
            enthalten.
            <br />
            Metadaten befinden sich in den Dateien{' '}
            <DownloadLink filename="unfallarten.csv" />,{' '}
            <DownloadLink filename="unfallkategorien.csv" />,{' '}
            <DownloadLink filename="unfalltypen.csv" />,{' '}
            <DownloadLink filename="unfallursachen.csv" /> und{' '}
            <DownloadLink filename="verkehrsbeteiligung.csv" />.
          </Typography>
          <Paper>
            <Table aria-label="Rohdaten download">
              <TableHead>
                <TableRow>
                  <TableCell>Jahr</TableCell>
                  <TableCell align="right">Downloadlink Excel</TableCell>
                  <TableCell align="right">
                    Downloadlink CSV (Bereinigt)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rawLinks.map(({ year, excelLink, csvLink }) => (
                  <TableRow key={year}>
                    <TableCell component="th" scope="row">
                      {year}
                    </TableCell>
                    <TableCell align="right">
                      <DownloadLink filename={excelLink} />
                    </TableCell>
                    <TableCell align="right">
                      <DownloadLink filename={csvLink} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default DataPage;
