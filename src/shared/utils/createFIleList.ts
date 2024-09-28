import {IFile, TFileList} from 'my-portfolio-types';

export const createFileListFromMetaFileList = (metaFileList: TFileList): FileList => {
  const dataTransfer = new DataTransfer();

  metaFileList.forEach((item: IFile) => {
    const file = new File([item.fileSrc], item.fileName);
    dataTransfer.items.add(file);
  });

  return dataTransfer.files;
};
