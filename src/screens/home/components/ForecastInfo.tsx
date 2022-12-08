import React from 'react';
import { StyleSheet, View } from 'react-native';

import { isEmpty, isTrue } from '../../../base/utils/baseUtil';
import { ImageWithLoader } from '../../../components/ImageWithLoader';
import { Ag, Text } from '../../../components/ui/Text';
import DateHelper from '../../../helpers/DateHelper';
import ForecastRenderHelper from '../../../modules/forecast/helpers/ForecastRenderHelper';
import { Forecast } from '../../../modules/forecast/models/Forecast';
import { DateTypes } from '../../../types/Date';

interface IForecastInfoProps {
  forecast: Forecast;
}

export const ForecastInfo = (props: IForecastInfoProps) => {
  const renderWeatherShort = () => {
    return props.forecast.weather.map((item, index) => (
      <View key={`short_${index}`} style={styles.weatherShortContainer}>
        {isTrue(item.icon) && (
          <ImageWithLoader
            style={styles.icon}
            containerStyles={styles.iconContainer}
            source={{ uri: ForecastRenderHelper.getWeatherIconUrl(item) }}
            resizeMode={'contain'}
          />
        )}

        {isTrue(item.description) && (
          <Text ag={Ag.Regular} style={styles.weatherShortTitle}>
            {item.description!}
          </Text>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {!isEmpty(props.forecast.timezone) && (
        <Text ag={Ag.Regular} style={styles.infoItem}>
          {DateHelper.getFormattedLocationDate(props.forecast.timezone!, DateTypes.dayMonthCommaHoursMinutes)}
        </Text>
      )}

      {isTrue(props.forecast.name) && (
        <Text ag={Ag.H2} style={styles.infoItem}>
          {ForecastRenderHelper.prepareForecastLocationName(props.forecast)}
        </Text>
      )}

      {!isEmpty(props.forecast.main?.temp) && (
        <Text ag={Ag.H1} style={styles.temperature}>
          {Math.round(props.forecast.main?.temp!)} {'\u00b0'}C
        </Text>
      )}

      {!isEmpty(props.forecast.main?.feels_like) && (
        <Text ag={Ag.Regular} style={styles.infoItem}>
          {ForecastRenderHelper.prepareForecastDescription(props.forecast)}
        </Text>
      )}

      {renderWeatherShort()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 4,
  },
  temperature: {
    marginBottom: 8,
  },
  weatherShortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  weatherShortTitle: {
    flexShrink: 1,
  },
});
