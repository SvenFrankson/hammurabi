using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestMBH : MonoBehaviour {

	public int speed;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		this.transform.localRotation *= Quaternion.AngleAxis(speed, Vector3.up);
	}

	public void TestMethod( int   a) {

	}

	public void TestMethod2( int   a , int  foo ,     float  bar   ) {

	}
}
