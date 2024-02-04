import React from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  Button,
  CardGrid,
  Cell,
  ContentCard,
  CustomSelectOption,
  Div,
  FormItem,
  Group,
  Header,
  Input,
  Panel,
  PanelHeader,
  Radio,
  Select,
  Separator,
  Spacing
} from '@vkontakte/vkui'
import axios from 'axios'
import bridge from '@vkontakte/vk-bridge'

const Home = ({ id, go, fetchedUser }) => {
  const [name, setName] = React.useState('')
  const [yearsTogether, setYears] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const [format, setFormat] = React.useState('poem')
  const [result, setResult] = React.useState({})
  const [holiday, setHoliday] = React.useState('feb14')
  const [generations, setGenerations] = React.useState([])
  bridge.send('VKWebAppStorageGet', {
    keys: [
      'generations',
    ]
  })
    .then((data) => {
      if (data.keys) {
        const value = data.keys.find(e => e.key === 'generations')
        console.log({ data, value })
        setGenerations(value.value ? JSON.parse(value.value) : [])
        // Значения получены
      }
    })
    .catch((error) => {
      // Ошибка
      console.error(error)
    })

  const onChange = (e) => {
    const { name, value } = e.currentTarget
    const setStateAction = {
      name: setName,
      yearsTogether: (val) => setYears(val ? parseInt(val) : ''),
      status: setStatus,
      format: setFormat,
      holiday: setHoliday,
    }[name]

    setStateAction && setStateAction(value)
  }

  const generate = async () => {
    setLoading(true)
    const { data } = await axios.post('https://vk-mini-greetings.amorev.ru/api/getGreetingText', {
      name,
      yearsTogether,
      status,
      format,
      holiday
    })
    console.log(data)
    setLoading(false)
    setResult(data)
    const oldGenerations = generations
    const newGenerations = [...oldGenerations, data]
    setGenerations(newGenerations)
    console.log({
      oldGenerations,
      newGenerations
    })
    bridge.send('VKWebAppStorageSet', {
      key: 'generations',
      value: JSON.stringify(newGenerations)
    })
      .then((data) => {
        if (data.result) {
          console.log('set success')
          // Значение переменной задано
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error)
      })

    bridge.send('VKWebAppShowBannerAd', {
      banner_location: 'top'
    })
      .then((data) => {
        if (data.result) {
          console.log('banner')
          // Баннерная реклама отобразилась
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error)
      })
  }

  return <Panel id={id}>
    <PanelHeader>Example</PanelHeader>
    {fetchedUser &&
      <Group header={<Header mode="secondary">Ваша информация</Header>}>
        <Cell
          before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
          subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
        >
          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </Cell>
      </Group>}

    <Group header={<Header mode="secondary">Navigation Example</Header>}>
      <Div>
        <FormItem
          htmlFor="name"
          top="Имя"
          status={name ? 'valid' : 'error'}
          bottom={
            name ? '' : 'Введите имя'
          }
          bottomId="name-type"
        >
          <Input
            aria-labelledby="name-type"
            id="name"
            type="text"
            name="name"
            value={name}
            required
            onChange={onChange}
          />
        </FormItem>
        <FormItem
          htmlFor="yearsTogether"
          top="Сколько вы вместе лет?"
          status={yearsTogether ? 'valid' : 'error'}
          bottom={
            yearsTogether ? '' : 'Введите число'
          }
          bottomId="yearsTogether-type"
        >
          <Input
            aria-labelledby="yearsTogether-type"
            id="yearsTogether"
            type="text"
            name="yearsTogether"
            value={yearsTogether}
            required
            onChange={onChange}
          />
        </FormItem>
        <FormItem
          top="Кто он(а) для вас?"
          htmlFor="select-status"
          bottom="Пример использования Select для выбора администратора из списка"
        >
          <Select
            id="select-id"
            placeholder="Не выбран"
            onChange={onChange}
            name="status"
            options={[
              { value: 'wife', label: 'Жена' },
              { value: 'girlfriend', label: 'Девушка' },
              { value: 'boyfriend', label: 'Парень' },
              { value: 'husband', label: 'Муж' },
            ].map((user) => ({
              label: user.label,
              value: user.value,
            }))}
            renderOption={({ option, ...restProps }) => (
              <CustomSelectOption
                {...restProps}
                key={option.value}
              />
            )}
          />
        </FormItem>
        <FormItem top="Формат поздравления">
          <Radio name="format" value="poem" defaultChecked onChange={onChange}>
            Стихи
          </Radio>
          <Radio name="format" value="text" onChange={onChange}>
            Проза
          </Radio>
        </FormItem>
        <FormItem top="Праздник">
          <Radio name="holiday" value="feb14" onChange={onChange} defaultChecked>
            14 февраля
          </Radio>
          <Radio name="holiday" value="feb23" onChange={onChange}>
            23 Февраля
          </Radio>
          <Radio name="holiday" value="march8" onChange={onChange}>
            8 Марта
          </Radio>
        </FormItem>
        <Button
          stretched={true}
          loading={loading}
          size="l"
          align="center"
          sizeY="regular"
          onClick={() => {
            generate()
          }}
        >
          Сгенерировать
        </Button>
        <Spacing size={12}/>
        <Separator/>
        <Spacing size={20}/>
        {
          generations.length > 0 ?
            generations.map(g => <CardGrid size="l">
              <ContentCard
                header="Результат"
                text={g.text}
              />
            </CardGrid>) : ''
        }
      </Div>
    </Group>
  </Panel>
}

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
}

export default Home
