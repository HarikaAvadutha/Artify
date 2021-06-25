import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const OverviewDashboard = lazy(() => import('../../container/dashboard/overview/overviewdashboard'));
const ImageDashboard = lazy(() => import('../../container/dashboard/images/imagedashboard'));
const CatalogueValuationDashboard = lazy(() => import('../../container/dashboard/catalogue/catalogueValuation'));
const ComparablesDashboard = lazy(() => import('../../container/dashboard/comparables/comparables'));
const GalleryDashboard = lazy(() => import('../../container/dashboard/gallery/gallery'));
const IdentificationsDashboard = lazy(() => import('../../container/dashboard/identifications/identifications'));
const Ecommerce = lazy(() => import('../../container/dashboard/Ecommerce'));
const Business = lazy(() => import('../../container/dashboard/Business'));
const Performance = lazy(() => import('../../container/dashboard/Performance'));
const CRM = lazy(() => import('../../container/dashboard/CRM'));
const Sales = lazy(() => import('../../container/dashboard/Sales'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={`${path}/overview`} component={OverviewDashboard} />
      <Route path={`${path}/image`} component={ImageDashboard} />
      <Route path={`${path}/catalogue`} component={CatalogueValuationDashboard} />
      <Route path={`${path}/comparables`} component={ComparablesDashboard} />
      <Route path={`${path}/gallery`} component={GalleryDashboard} />
      <Route path={`${path}/identifications`} component={IdentificationsDashboard} />
      <Route path={`${path}/social`} component={Dashboard} />
      <Route exact path={`${path}/eco`} component={Ecommerce} />
      <Route exact path={`${path}/business`} component={Business} />
      <Route exact path={`${path}/performance`} component={Performance} />
      <Route exact path={`${path}/crm`} component={CRM} />
      <Route exact path={`${path}/sales`} component={Sales} />
    </Switch>
  );
};

export default DashboardRoutes;
