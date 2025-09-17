export interface Tag {
  tag_no: number;
  tag_type: string;
  tag_name: string;
}

export interface Genre extends Tag {
  tag_type: 'GENRE';
}

export interface Evaluation {
  recommend_count: number;
  total_evaluation_count: number;
}

export interface Rating {
  rating_board_type: string;
  rating: string;
  rating_descriptor_types: Array<string>;
  rating_id: string;
  cert_id: string;
  direct: boolean;
  except: boolean;
  content: string | null;
  issued_at: string | null;
}

export interface Amount {
  currency: string;
  discount_rate: number;
  original_price: number;
  sales_price: number;
  discount_period: {
    start: number;
    end: number;
  };
  discount_sales_limit_count: number;
}

export interface DisableStatus {
  status: string;
  reason: string;
}

export interface Product {
  product_no: number;
  game_id: string;
  game_no: number;
  shop_item_id: number;
  group_id: string;
  project_id: string;
  board_seq: number;
  review_board_seq: number;
  product_type: string;
  product_detail_type: string;
  demo: boolean;
  platform_types: Array<string>;
  product_options: Array<unknown>;
  early_access: boolean;
  paid: boolean;
  migrate: boolean;
  pre_install: boolean;
  release_status: string;
  sale_status: string;
  restrict_status: string;
  disable_status: DisableStatus;
  genre: Genre;
  genres: Array<Genre>;
  tags: Array<Tag>;
  product_name: string;
  name_header: string;
  short_piece: string;
  title_image_square: string;
  title_image_rectangle: string;
  screenshots: string | null;
  player_resources: unknown | null;
  evaluation: Evaluation;
  ratings: Array<Rating>;
  time_format_type: string;
  release_at: number;
  release_modified_at: number;
  amount: Amount;
  owner: boolean;
  parent_no: number | null;
  dlc_nos: Array<number>;
  sub_product_nos: Array<number>;
  review_count: number;
}

export interface AggregationBucket {
  key: number;
  doc_count: number;
}

export interface Aggregation {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Array<AggregationBucket>;
}

export interface Aggregations {
  genre_product_counts: Aggregation;
  tag_product_counts: Aggregation;
}

export interface ApiResponse {
  code: number;
  message: string;
  value: {
    aggregations: Aggregations;
    contents: Array<Product>;
    total_pages: number;
    total_elements: number;
    size: number;
    page: number;
    first: boolean;
    last: boolean;
  };
}
