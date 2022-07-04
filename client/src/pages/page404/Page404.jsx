import { Col, Divider, Row, Typography } from "antd";
import React from "react";

export default function Page404() {
  return (
    <>
      <Divider orientation="left">Percentage columns</Divider>
      <Row>
        <Col flex={2}>
          <Typography.Title editable level={1} style={{ margin: 0 }}>
            h1. Ant Design
          </Typography.Title>
          <Typography.Title editable level={2} style={{ margin: 0 }}>
            h2. Ant Design
          </Typography.Title>
          <Typography.Title editable level={3} style={{ margin: 0 }}>
            h3. Ant Design
          </Typography.Title>
          <Typography.Title editable level={4} style={{ margin: 0 }}>
            h4. Ant Design
          </Typography.Title>
          <Typography.Title editable level={5} style={{ margin: 0 }}>
            h5. Ant Design
          </Typography.Title>
        </Col>
        <Col flex={2}>Ошибка 404</Col>
      </Row>
    </>
  );
}

/* <Box
border-width="1px 0px 0px 0px"
border-style="solid"
border-color="#C4C4C4"
padding="80px 16px 80px 0px"
md-padding="60px 16px 60px 0px"
display="flex"
height="100%"
align-items="flex-start"
flex-direction="column"
>
<Text
  margin="0px 0px 0px 0px"
  font="--headline2"
  color="--dark"
  lg-font='400 30px/1.2 "Fira Sans", sans-serif'
>
  Что-то произошло{" "}
  <Span
    color="--primary"
    font='700 50px/60px "Fira Sans", sans-serif'
    lg-font='700 30px/60px "Fira Sans", sans-serif'
  >
    ошибка
  </Span>
</Text>
<Text
  margin="16px 0px 0px 0px"
  font="--headline4"
  color="--dark"
  lg-font='400 24px/1.2 "Fira Sans", sans-serif'
>
  ошибка 404
</Text>
</Box>
</Box>
<Box
width="50%"
display="flex"
padding="24px 32px 24px 32px"
flex-direction="column"
justify-content="space-between"
border-color="#"
background="--color-primary"
md-width="100%"
md-margin="0px 0px 0px 0px"
md-padding="44px 16px 44px 16px"
>
<Text
margin="0px 0px 0px 0px"
font="--headline4"
color="--light"
lg-font='normal 400 20px/1.3 "Fira Sans", sans-serif'
sm-font='normal 400 18px/1.4 "Fira Sans", sans-serif'
>
Оооой... эта страница пока временно недоступна.
</Text>
</Box> */
