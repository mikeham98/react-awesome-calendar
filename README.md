# React Awesome Parallax
react-awesome-parallax is a library that easily allows you to add parallax scrolling to any React component.

## Installation
```bash
npm install --save react-awesome-parallax
```

## Guide
### Basic use
```bash
import Parallax from 'react-awesome-parallax';

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <Parallax speed={5}>
                    <h1>Hello</h1>
                </Parallax>

                <Parallax speed={3}>
                    <h1>world</h1>
                </Parallax>
            </div>
        );
    }
}

```

### Props
|Name                   |Type         |Range         |Default Value       |
|-----------------------|-------------|--------------|--------------------|
|speed                  |Numeric      |0-10          |10                  |
