export interface Pack {
  id: number;
  name: string;
}

export interface IllustrationData {
  id: number;
  pack: Pack;
  keywords: string[];
  assignedExtensions: string[];
  createdDate: Date;
  cover: string;
  name: string;
}

export interface Pagination {
  currentPage: number;
  allPage: number;
  allCount: number;
  from: number;
  to: number;
}

export interface Result {
  illustrationData: IllustrationData[];
  pagination: Pagination;
}

export interface RootDataDto {
  success: boolean;
  result: Result;
  message?: string;
  code?: string;
}

export interface RootDataParams {
  count: number;
  page: number;
}
