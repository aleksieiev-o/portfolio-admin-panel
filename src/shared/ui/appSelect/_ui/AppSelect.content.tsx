import {FC} from 'react';
import {SelectContent, SelectItem} from '@/components/ui/select';

interface Props {
  dataList: Array<{value: string; title: string}>;
  emptyDataListMessage: string;
}

const AppSelectContent: FC<Props> = (props) => {
  const {dataList, emptyDataListMessage} = props;

  return (
    <SelectContent>
      {dataList && dataList.length > 0 ? (
        dataList.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))
      ) : (
        <SelectItem value="null" disabled={true}>
          {emptyDataListMessage}
        </SelectItem>
      )}
    </SelectContent>
  );
};

export default AppSelectContent;
