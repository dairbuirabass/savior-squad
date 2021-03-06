import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import { wp, hp } from '../utils/index';
import _ from 'lodash';
import moment from 'moment';
import { MapView } from 'expo';

const EventInfoScreen = ({
  event,
  onGetMarkerRef,
  onMapRegionChangeComplete,
  participated,
  onClickParticipate,
  onClickUnparticipate,
  onClickStartSearching,
  onClickCaseInfo
}) => {
  const caseInfo = Object.values(event.case)[0];
  const { name, lastKnownLoc } = caseInfo;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.caseInfo}>
        <Text
          style={[
            styles.eventAgendaTitle,
            {
              color: '#4BA2AC',
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 60,
              paddingRight: 60,
              borderRadius: 16,
              fontFamily: 'proxima-nova-extra-bold',
              marginBottom: hp(2),
              fontSize: 40
            }
          ]}
        >
          {event.name}
        </Text>
      </View>
      <View style={styles.eventInfo}>
        <View style={styles.infoContainer}>
          <Icon name="map-marker" type="font-awesome" />
          <Text style={styles.eventTextInfo}>
            {event.loc.city}, {event.loc.country}
          </Text>
        </View>
        <View style={[styles.infoContainer, { paddingLeft: wp(3) }]}>
          <Icon name="calendar" type="font-awesome" />
          <Text style={[styles.eventTextInfo, { paddingLeft: wp(1.9) }]}>
            {event.date}, {event.time}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon
            name="users"
            type="font-awesome"
            containerStyle={{ marginLeft: -5 }}
          />
          <Text style={[styles.eventTextInfo, { paddingLeft: wp(1.5) }]}>
            {event.participants ? _.size(event.participants) : 0} participants
          </Text>
        </View>
      </View>
      <View style={styles.caseInfo}>
        <Text style={styles.eventAgendaTitle}>Case Info</Text>
      </View>
      <TouchableOpacity
        style={styles.personInfo}
        onPress={() => onClickCaseInfo(Object.keys(event.case)[0])}
      >
        <View style={styles.userAvatar}>
          <Image
            source={{ uri: caseInfo.imgUrls[0] }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              resizeMode: 'contain'
            }}
          />
          {/*<Icon name="user" type="font-awesome" size={wp(12)} color='#50C9BA' />*/}
        </View>
        <View style={styles.userDetail}>
          <Text style={{ fontSize: 18, color: '#4BA2AC' }}>{name}</Text>
          <Text>
            Last seen: {lastKnownLoc.streetAddress}, {lastKnownLoc.postalCode}{' '}
            {lastKnownLoc.city}, {lastKnownLoc.country}
          </Text>
        </View>
        <View style={styles.clickMoreDetails}>
          <Icon
            name="angle-right"
            type="font-awesome"
            size={wp(12)}
            color="#50C9BA"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.eventAction}>
        {participated ? (
          <View>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: hp(2),
                fontSize: wp(5),
                fontWeight: 'bold'
              }}
            >
              You have enrolled to this event
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: hp(2),
                fontSize: wp(9),
                fontWeight: 'bold'
              }}
            >
              {moment(`${event.date} ${event.time}`).fromNow(true)} left
            </Text>
            <Button
              title="Unparticipate"
              onPress={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure you want to unparticipate?',
                  [
                    { text: 'Cancel' },
                    {
                      text: 'OK',
                      onPress: () => onClickUnparticipate(event.id)
                    }
                  ]
                );
              }}
              containerViewStyle={{ marginBottom: hp(2.5) }}
              buttonStyle={{
                backgroundColor: 'white',
                borderColor: '#50C9BA',
                borderWidth: 1
              }}
              textStyle={{ color: '#4BA2AC' }}
            />
            <Button
              title="Start Searching"
              raised
              onPress={onClickStartSearching}
              icon={{ name: 'crosshairs', type: 'font-awesome' }}
              buttonStyle={{ backgroundColor: '#50C9BA' }}
            />
          </View>
        ) : (
          <Button
            title="Participate"
            raised
            icon={{ name: 'hand-paper-o', type: 'font-awesome' }}
            onPress={() => onClickParticipate(event.id)}
            buttonStyle={{ backgroundColor: '#50C9BA' }}
          />
        )}
      </View>
      <View style={styles.eventAgenda}>
        <Text style={styles.eventAgendaTitle}>Where we'll meet</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={{ flex: 1 }}
          scrollEnabled={false}
          initialRegion={{
            ...event.loc.coord,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          onRegionChangeComplete={onMapRegionChangeComplete}
        >
          <MapView.Marker
            coordinate={{
              ...event.loc.coord
            }}
            title="Where we'll meet"
            description={`${event.loc.streetAddress}, ${event.loc.city}, ${event
              .loc.country}`}
            ref={onGetMarkerRef}
          >
            <View style={styles.mapIndicator} />
          </MapView.Marker>
        </MapView>
      </View>
      <View style={[styles.eventAgenda, { marginTop: hp(10) }]}>
        <Text style={styles.eventAgendaTitle}>What we'll do</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
      </View>
    </ScrollView>
  );
};

EventInfoScreen.propTypes = {
  event: PropTypes.object,
  onGetMarkerRef: PropTypes.func,
  onMapRegionChangeComplete: PropTypes.func,
  participated: PropTypes.bool,
  onClickParticipate: PropTypes.func,
  onClickUnparticipate: PropTypes.func,
  onClickStartSearching: PropTypes.func,
  onClickCaseInfo: PropTypes.func
};

EventInfoScreen.defaultProps = {
  event: {},
  participated: false,
  onGetMarkerRef: () => {},
  onMapRegionChangeComplete: () => {},
  onClickParticipate: () => {},
  onClickUnparticipate: () => {},
  onClickStartSearching: () => {},
  onClickCaseInfo: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  infoContainer: {
    flexDirection: 'row',
    paddingLeft: wp(4),
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(1)
  },
  eventTextInfo: {
    paddingLeft: wp(3)
  },
  personInfo: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: hp(1.5),
    paddingBottom: hp(1.5),
    marginTop: hp(3),
    borderColor: '#50C9BA'
  },
  userAvatar: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: wp(5)
  },
  userDetail: {
    flex: 2,
    alignItems: 'flex-start'
  },
  clickMoreDetails: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: wp(5)
  },
  eventAction: {
    marginTop: hp(4),
    marginBottom: hp(3),
    paddingLeft: wp(8),
    paddingRight: wp(8)
  },
  eventAgenda: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(8),
    marginBottom: hp(2)
  },
  eventAgendaTitle: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  map: {
    height: 300
  },
  mapContainer: {
    height: hp(30)
  },
  mapIndicator: {
    backgroundColor: '#9EE6CF',
    opacity: 0.4,
    height: 36,
    width: 36,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: '#004d40'
  },
  eventDescription: {
    marginTop: hp(2),
    marginBottom: hp(2),
    marginLeft: wp(6),
    marginRight: wp(6),
    fontSize: 16
  },
  caseInfo: {
    marginTop: hp(2),
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EventInfoScreen;
