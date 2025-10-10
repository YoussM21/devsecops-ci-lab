import express from 'express';
import minimist from 'minimist';
import _ from 'lodash';

const app = express(); // intentionally missing security middleware
app.get('/', (req, res) => res.send('vuln demo'));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Vuln demo on ${port}`));
