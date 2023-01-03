import { axiosAdminPath, axiosPublicPath, axiosRootPath } from "./axios.js";

export const PATH_TYPES = {
  PUBLIC: "PUBLIC",
  ROOT: "ROOT",
  ADMIN: "ADMIN"
}

export class QueryService {
  constructor(basePath, adminPath = PATH_TYPES.PUBLIC, headers = {}) {
    let http;
    switch (adminPath) {
      case PATH_TYPES.ROOT:
        http = axiosRootPath(headers);
        break;
      case PATH_TYPES.ADMIN:
        http = axiosAdminPath(headers);
        break;
      default:
        http = axiosPublicPath(headers);
        break;
    }

    this.http = http;
    this.basePath = basePath;
  }

  findAll = async () => {
    return await this.http.get(this.basePath).then(res => res.data);
  };

  findOne = async (id) => {
    return this.http.get(`${this.basePath}/${id}`).then(res => res.data);
  };

  get = async (params = {}) => {
    return this.http.get(this.basePath,{
      params: params
    }).then(res => res.data);
  };

  create = async (data) => {
    return this.http.post(this.basePath, data).then(res => res.data);
  };

  update = async (id, data) => {
    return this.http.patch(`${this.basePath}/${id}`, data).then(res => res.data);
  };

  updateCustom = async (url, data) => {
    return this.http.patch(url, data).then(res => res.data);
  };

  delete = async (id) => {
    return this.http.delete(`${this.basePath}/${id}`).then(res => res.data);
  };

  deleteCustom = async (url) => {
    return this.http.delete(url).then(res => res.data);
  };

  async post(input) {
    return this.http.post(this.basePath, input).then(res => res);
  }

  async login(input) {
    return this.http.post(this.basePath, input).then(res => res);
  }

  async resetPassword(input) {
    return this.http
      .post(this.basePath, input)
      .then(res => res.data);
  }

  async resetPasswordEdit(input) {
    return this.http
      .put(this.basePath, input)
      .then(res => res);
  }
}
