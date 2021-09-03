import React from 'react'
import { Breadcrumb,Header } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const BreadcrumbExample = () => (
  <Breadcrumb size="big">
          <Link to="/">
          <Breadcrumb.Section  link>Главная</Breadcrumb.Section>
          </Link>
   
    <Breadcrumb.Divider />
    <Breadcrumb.Section link>Заказать буст</Breadcrumb.Section>
  </Breadcrumb>
)

export default BreadcrumbExample;