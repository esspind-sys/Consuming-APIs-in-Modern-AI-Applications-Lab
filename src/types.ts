export interface GiphyImage {
  url: string;
  width: string;
  height: string;
}

export interface GifData {
  id: string;
  title: string;
  images: {
    original: GiphyImage;
    fixed_height: GiphyImage;
  };
}

export interface GiphyRandomResponse {
  data: GifData;
  meta: {
    status: number;
    msg: string;
  };
}

export interface GiphySearchResponse {
  data: GifData[];
  meta: {
    status: number;
    msg: string;
  };
}

export interface GeminiStreamChunk {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];


  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}


export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}