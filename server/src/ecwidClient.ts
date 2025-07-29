import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { ECWID_STORE_ID, ECWID_TOKEN } = process.env;

export const ecwidClient = axios.create({
  baseURL: `https://app.ecwid.com/api/v3/${ECWID_STORE_ID}`,
  headers: { Authorization: `Bearer ${ECWID_TOKEN}` },
});
