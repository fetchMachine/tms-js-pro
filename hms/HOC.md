## withFetch HOC

### Todo
- Написать HOC, который будет предоставлять функционал менеджмента состояни загрузки.
    - имеет метод fetchData, который запрашивает данные с бекенда
    - имеет в стейте флаги isError, isLoading и поле data, куда кладет полученную с бекенда информацию
    - прокидывает все это в компонет, который оборачивает
- За основу берем логику запроса из weather-app и просто выносим ее в HOC.

### Пример использования
```javascript
class MyWeatherComponent extends React.Component {
    state = { q: 'minsk', units: '' };

    getData = () => {
        const { fetctData } = this.props;
        fetctData({ ...this.state, appId: '' });
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        this.getData();
    }

    render() {
        const { isError, isLoading, data } = this.props;

        return (
            <div>
                {isError && <p>Что-то пошло не так</p>}
                {isLoading && !isError && <p>Загрузка</p>}
                {!isLoading && !isError && <WeatherTable data={data} />}
            </div>
        );
    }
}

const weatherApiUrl = '';
const MyWeatherComponentWithFetch = withFetch(MyWeatherComponent, weatherApiUrl);

ReactDom.render(
    <MyWeatherComponentWithFetch />,
    document.getElementById("root"),
);
```
