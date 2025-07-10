import oracledb, { outFormat } from "oracledb";

const oracleDbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_HOST,
};

async function runQuery(query: string) {
  let connection;

  try {
    connection = await oracledb.getConnection(oracleDbConfig);

    const result = await connection.execute(
      query,
      [], // binding parameters
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT // <--- This will ensure that rows are returned as objects
      }
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

export default runQuery;
