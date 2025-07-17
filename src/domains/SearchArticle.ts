export interface ISearchArticle {
  status: string;
  copyright: string;
  response: Response;
}

export interface Response {
  docs: Doc[];
  metadata: Metadata;
}

export interface Doc {
  abstract: string;
  byline: Byline;
  document_type: string;
  headline: Headline;
  _id: string;
  keywords: Keyword[];
  multimedia: Multimedia;
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
}

export interface Byline {
  original: string;
}

export interface Headline {
  main: string;
  kicker: string;
  print_headline: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
}

export interface Multimedia {
  caption: string;
  credit: string;
  default: Default;
  thumbnail: Thumbnail;
}

export interface Default {
  url: string;
  height: number;
  width: number;
}

export interface Thumbnail {
  url: string;
  height: number;
  width: number;
}

export interface Metadata {
  hits: number;
  offset: number;
  time: number;
}
