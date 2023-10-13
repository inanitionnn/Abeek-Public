/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgm.createTable('films', {
    isPublic: { type: 'boolean', default: false },
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    type: { type: 'varchar(10)', notNull: true },
    title: { type: 'varchar(255)', notNull: true },
    year: { type: 'smallint' },
    country: { type: 'varchar(55)' },
    plot: { type: 'varchar(1020)' },
    directedBy: { type: 'varchar(55)[]' },
    starring: { type: 'varchar(55)[]' },
    language: { type: 'varchar(55)' },
    runTime: { type: 'varchar(10)' },
    boxOffice: { type: 'varchar(55)' },
    budget: { type: 'varchar(55)' },
    genres: { type: 'varchar(55)[]' },
    tags: { type: 'varchar(55)[]' },
    image: { type: 'varchar(255)' },
    embedding: { type: 'vector(1536)' },
    moderId: {
      type: 'uuid',
      references: '"users"',
    },
    creatorId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
    },
    report: { type: 'varchar(1020)' },
    isChecked: { type: 'boolean', default: false },
    createdType: { type: 'varchar(55)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('films', 'id');
  pgm.createIndex('films', 'year');
  pgm.createIndex('films', 'type');
  pgm.createIndex('films', 'isPublic');
  pgm.createIndex('films', ['createdAt', 'isChecked', 'isPublic']);
  pgm.sql(
    `CREATE INDEX "films_title_index" ON "films" USING GIN (to_tsvector('english', title))`,
  );
  pgm.sql(`CREATE INDEX "films_genres_index" ON "films" USING GIN(genres);`);
};
