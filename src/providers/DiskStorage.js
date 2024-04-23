// importa o módulo de sistema de arquivos do Node.js
const fs = require("fs");
// importa o módulo de caminhos do Node.js
const path = require("path");
// importa as configurações de upload
const uplaodConfig = require("../configs/upload");

class DiskStorage {
  // método assíncrono para salvar um arquivo
  async SaveFile(file) {
    // função rename do módulo fs utilizada para mover o arquivo
    await fs.promises.rename(
      // do diretório temporário
      path.resolve(uplaodConfig.TMP_FOLDER, file),
      // para o diretório de upload
      path.resolve(uplaodConfig.UPLOADS_FOLDER, file)
    );

    return file; // Retorna o nome do arquivo
  }

  // método assíncrono para deletar um arquivo
  async deleteFile(file) {
     // Resolve o caminho do arquivo
    const filePath = path.resolve(uplaodConfig.UPLOADS_FOLDER, file);

    try {
     // tenta obeter o estado do arquivo
      await fs.promises.stat(filePath);
    } catch {
      return; // se o arquivo não existir, sai do método
    }

    // Deleta o arquivo
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;