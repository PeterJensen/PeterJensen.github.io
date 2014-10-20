var Vec2 = Box2D.b2Vec2
  , BodyDef = Box2D.b2BodyDef
  , Body = Box2D.b2Body
  , FixtureDef = Box2D.b2FixtureDef
  , Fixture = Box2D.b2Fixture
  , World = Box2D.b2World
  , MassData = Box2D.b2MassData
  , PolygonShape = Box2D.b2PolygonShape
  , CircleShape = Box2D.b2CircleShape
  , RevoluteJointDef = Box2D.b2RevoluteJointDef
  , Settings = Box2D.b2Settings
  , b2Math = Box2D.b2Math;
;

var world;

var PYRAMID_SIZE = 40;

function init() {
  var gravity = new Vec2(0.0, -10.0);
  world = new World(gravity);

  {
    var bd = new BodyDef();
    var ground = world.CreateBody(bd);
  }

  {
    var bd = new BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    bd.set_allowSleep(false);
    bd.set_position(new Vec2(0.0, 10.0));
    var body = world.CreateBody(bd);

    var shape = new PolygonShape();
    shape.SetAsBox(0.5, 10.0, new Vec2(10.0, 0.0), 0.0);
    body.CreateFixture(shape, 5.0);

    shape.SetAsBox(0.5, 10.0, new Vec2(-10.0, 0.0), 0.0);
    body.CreateFixture(shape, 5.0);

    shape.SetAsBox(10.0, 0.5, new Vec2(0.0, 10.0), 0.0);
    body.CreateFixture(shape, 5.0);

    shape.SetAsBox(10.0, 0.5, new Vec2(0.0, -10.0), 0.0);
    body.CreateFixture(shape, 5.0);

    var jd = new RevoluteJointDef();
    jd.set_bodyA(ground);
    jd.set_bodyB(body);
    jd.set_localAnchorA(new Vec2(0.0, 10.0));
    jd.set_localAnchorB(new Vec2(0.0, 0.0));
    jd.set_referenceAngle(0.0);
    jd.set_motorSpeed(0.10 * Math.PI);
    jd.set_maxMotorTorque(1e8);
    jd.set_enableMotor(true);
    var joint = world.CreateJoint(jd);

    // add the balls in a pyramid
    {
      var step = (20.0 - 1.0) / PYRAMID_SIZE;
      var radius = step / 2 - 0.10;
      var shape = new CircleShape();
      shape.set_m_radius(radius);

      var bottomLeft = new Vec2(-9.5 + radius, 0.5 + radius);
      for (var y = 0; y < PYRAMID_SIZE; ++y) {
        for (var x = y; x < PYRAMID_SIZE; ++x) {
          var offset = new Vec2(x * step - y * step / 2, y * step);
          var bd = new BodyDef();
          bd.set_type(Box2D.b2_dynamicBody);
          var pos = new Vec2(bottomLeft.get_x() + offset.get_x(), bottomLeft.get_y() + offset.get_y());
          bd.set_position(pos);
          var body = world.CreateBody(bd);
          body.CreateFixture(shape, 5.0);
        }
      }
    }
  }
}

function step() {
  world.Step(1 / 60, 3, 3);
}

var simdUse = false;
var simdButton = document.getElementById("simd");
function simdClick() {
  var b2Params = new Box2D.b2Params();
  simdUse = !simdUse;
  b2Params.setSimd(simdUse);
  if (simdUse) {
    simdButton.innerHTML = "Turn SIMD OFF";
  }
  else {
    simdButton.innerHTML = "Turn SIMD ON";
  }

  alert("Use SIMD clicked");
}

if (simdButton) {
  simdButton.addEventListener("click", simdClick);
}
