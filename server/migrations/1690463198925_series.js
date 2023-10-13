/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgm.createTable('series', {
    isPublic: { type: 'boolean', default: false },
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    type: { type: 'varchar(10)', notNull: true },
    title: { type: 'varchar(255)', notNull: true },
    startYear: { type: 'smallint' },
    endYear: { type: 'smallint' },
    country: { type: 'varchar(55)' },
    plot: { type: 'varchar(1020)' },
    directedBy: { type: 'varchar(55)[]' },
    language: { type: 'varchar(55)' },
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
  pgm.createIndex('series', 'id');
  pgm.createIndex('series', 'startYear');
  pgm.createIndex('series', 'type');
  pgm.createIndex('series', 'isPublic');
  pgm.createIndex('series', ['createdAt', 'isChecked', 'isPublic']);
  pgm.sql(`CREATE INDEX "series_genres_index" ON "series" USING GIN(genres);`);
  pgm.sql(
    `CREATE INDEX "series_title_index" ON "series" USING GIN (to_tsvector('english', title))`,
  );

  pgm.createTable('seriesSeasons', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    seriesId: {
      type: 'uuid',
      notNull: true,
      references: '"series"',
      onDelete: 'cascade',
    },
    season: { type: 'smallint', notNull: true },
    title: { type: 'varchar(255)' },
    episodes: { type: 'smallint' },
  });
  pgm.createIndex('seriesSeasons', 'seriesId');

  pgm.createTable('userSeasons', {
    seriesId: {
      type: 'uuid',
      notNull: true,
      references: '"series"',
      onDelete: 'cascade',
    },
    userId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    seasonId: {
      type: 'uuid',
      notNull: true,
      references: '"seriesSeasons"',
      onDelete: 'cascade',
    },
    rate: { type: 'smallint' },
  });
  pgm.createIndex('userSeasons', ['userId', 'seriesId']);
  pgm.createIndex('userSeasons', ['userId', 'seasonId']);
};
