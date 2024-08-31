import fse from 'fs-extra'

export class DirUtils {
  static async removeAndCreateDir(path: string) {
    fse.emptyDirSync(path);
    fse.ensureDirSync(path);
  }
}